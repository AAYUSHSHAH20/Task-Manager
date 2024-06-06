const Task = require('../models/Task')
const asynchandler = require('../middleware/asynchandler');
const errorResponse = require('../utils/errorresponse');
const sendEmail = require('../utils/sendEmail');

//@desc Get all Tasks
//routes GET/TaskManager
exports.getallTask = asynchandler(async(req,res,next) => {
    res.status(200).json(res.advanceResults);
})

// @desc    Create a new task
// @route   POST /api/v1/tasks
exports.createTask = asynchandler(async (req, res, next) => {
    const { title, description, category, dueDate } = req.body;
  
    try {
      // Create a new task
      const task = new Task({
        title,
        description,
        category,
        dueDate: dueDate || new Date(),
      });
  
      await task.save();
  
      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (err) {
      next(err);
    }
  });

//@desc update Taks
//@routes PUT/taks/:id
exports.updateTask = asynchandler( async (req, res, next) => {
   
    let task = await Task.findById(req.params.id)

    if (!task) {
        return res.status(400).json({
            success: false,
            message: "Task not found"
        });
    }
    

    task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })


    res.status(200).json({
        success: true,
        data: task
    });

})  

//@desc delete bootcamps
//@routes DELETE/api/v1/bootcamps/:id
exports.deleteTask = asynchandler(async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        // Delete the bootcamp
        await task.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error(error); 
        return next(new errorResponse("Server Error", 500));
    }
});

// @desc    Toggle task completion status
// @route   PUT /tasks/:id/toggle
exports.toggleTaskCompletion = asynchandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return next(new errorResponse('Task not found', 404));
    }
  
    if (task.isCompleted) {
      return next(new errorResponse('Task is already completed', 400));
    }
  
    task.isCompleted = !task.isCompleted;
    await task.save();
  
    res.status(200).json({
      success: true,
      data: task,
    });
  });

  // @desc    Check due dates and send email notifications
  // @route   GET /tasks/check-due-dates
  // @access  Public
  exports.checkDueDates = asynchandler(async (req, res, next) => {
    const now = new Date();
    const tasks = await Task.find({ dueDate: { $lt: now }, isCompleted: false });
  
    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No tasks with due dates passed.',
      });
    }
  
    const emailPromises = tasks.map(async (task) => {
      const message = `The task "${task.title}" is overdue. Please complete it as soon as possible.`;
  
      try {
        await sendEmail({
          email: 'user@example.com', // Replace with the user's email address
          subject: 'Task Due Date Passed',
          message,
        });
        task.notified = true;
        await task.save();
      } catch (error) {
        console.error(`Failed to send email for task: ${task._id}. Error: ${error.message}`);
      }
    });
  
    await Promise.all(emailPromises);
  
    res.status(200).json({
      success: true,
      message: 'Email notifications sent for overdue tasks.',
    });
  });
  