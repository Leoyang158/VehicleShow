const Vehicle = require('../models/vehicle');

module.exports.index = async (req, res) =>{
    const cars = await Vehicle.find({});
    res.render('lists/index', {cars});
}

module.exports.renderNewForm = (req,res) => {
    res.render('lists/new');
}

module.exports.createVehicle = async (req, res, next) => {
    const car = new Vehicle(req.body.car);
    car.author = req.user._id;
    await car.save();
    req.flash('success', 'Successfully make a new car');
    res.redirect(`/lists/${car._id}`)
}

module.exports.showVehile = async (req, res) => {  
    const car = await Vehicle.findById(req.params.id).populate({   
        path: 'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    // console.log(car);
    if(!car){
        req.flash('error', 'Cannot find that vehicle');
        return res.redirect('/lists')
    }
    res.render('lists/show', { car });
}

module.exports.editVehicle = async (req, res) => { 
    //middleware has higher order 
    const { id } = req.params;
    const car = await Vehicle.findById(id);
    if(!car){
        req.flash('error', 'Cannot find that vehicle');
        return res.redirect('/lists')
    }
    res.render('lists/edit', { car });
}

module.exports.validateVehicle = async (req, res) => {
    const { id } = req.params;
    const car = await Vehicle.findByIdAndUpdate(id, { ...req.body.car });
    req.flash('success', 'Successfully updated vehicle');
    res.redirect(`/lists/${car._id}`)
}

module.exports.deleteVehicle = async (req, res) => {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a review');
    res.redirect('/lists');
}