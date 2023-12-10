const Task = require("../routes/models/task");
exports.tasks_get_all = (req,res,next) => {
    Task.find().
    then((result) => {
        res.status(200).json({message : "success", info: result});
    }).
    catch( (err) => console.log(err));
}


exports.tasks_add_new = (req,res,next) => {
    console.log(req.body.taskCreator);
    var task = new Task({
        title : req.body.title,
        description : req.body.description
    });
    task.save();
    
    res.status(201).json({
        message : "success",
        info: task
        });
}

exports.tasks_get_by_id = (req,res,next) => {
    const id = req.params.id;
    Task.findById(id).
    then((result) => {
        res.status(200).json({message : "success", info: result});
    }).
    catch( (err) => res.status(404).json(err));
   
}

exports.tasks_change = (req, res, next) => {
    const id = req.params.id;
        const newTask = {
        title: req.body.title,
        description: req.body.description,
    };

    Task.findByIdAndUpdate(id, newTask, { new: true })
        .then(updatedTask => {
            if (!updatedTask) {
               
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "success", info: updatedTask });
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error", error: err }));
};

exports.tasks_delete = (req,res,next) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id).
    then(() => {
        res.status(200).json({message : "success"});
    }).
    catch( (err) => res.status(404).json(err));

}
