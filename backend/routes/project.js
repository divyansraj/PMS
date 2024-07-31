const express=require('express');
const router = express.Router();

const {addFood,getallFoodItems,deleteOne,getFoodDetails, updateStatus} = require('../controller/projectController');


router.route('/add').post(addFood);
router.route('/allfooditems').get(getallFoodItems);
router.route('/delete').delete(deleteOne);
router.route('/getfood/:id').get(getFoodDetails);

router.route("/status").post(updateStatus);

module.exports = router;