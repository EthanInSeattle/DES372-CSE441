// const express = require('express');
// const router = express.Router();
// const experimentController = require('../controllers/ExperimentController');
// //const ReplaceEmptyStringWithNull =require('../Middlewares/ReplaceEmptyStringWithNull');
// const {sanitizeBody} = require('express-validator/filter');

// /**
//  * GET all experiments's id and the experiment data.
//  * @route GET /experiments
//  * @group read - Read experiment data
//  * @returns {object} 200 - An array of all experiments
//  * @returns {Error}  default - Unexpected error
//  */
// router.get('/experiments', experimentController.getAllExperiments);

// /**
//  * GET all data an experiment identified by id
//  * @route GET /experiment/:id
//  * @group read - Read experiment data
//  * @param {number} id.param.required - experiment id
//  * @returns {object} 200 - An object of experiment data
//  * @returns {Error}  default - Unexpected error
//  */
// router.get('/experiment/:id', experimentController.getExperimentById);

// // // GET all services' name
// // router.get('/services', experimentController.getAllServices);

// // POST a new experiment
// //router.post('/experiment/new', ReplaceEmptyStringWithNull, experimentController.putNewExperiment);

// const replaceEmptyStringWithNull= (obj) => {
//     //console.log('hellp')
//     for(let attribute in obj) {
//         //console.log('called');
//         if (obj[attribute] === "") {
//             obj[attribute] = null;
//         } else if ( obj[attribute] instanceof Object) {
//             replaceEmptyStringWithNull(obj[attribute]);
//         }
//     };
// };

// /**
//  * POST a new experiment
//  * @route POST /experiment/new
//  * @group write - Write experiment data
//  * @returns {object} 200 - An object containing data of the newly created experiment
//  * @returns {Error}  default - Unexpected error
//  */
// router.post('/experiment/new', 
//             sanitizeBody("experiment")
//             .customSanitizer(
//                 obj=>{
//                     //console.log('yoooooooooooooooooo!')
//                     // replaceEmptyStringWithNull(obj)
//                     // const cleanedObj = obj;
//                     // console.log("cleanedObj: ", cleanedObj);
//                     // return cleanedObj;
//                     for(let attribute in obj) {
//                         console.log('called');
//                         if (obj[attribute] === "") {
//                             obj[attribute] = null;
//                         } else if ( obj[attribute] instanceof Object) {
//                             replaceEmptyStringWithNull(obj[attribute]);
//                         }
//                     };
//                 }
//             ),
//             experimentController.putNewExperiment);

// //router.post('/experiment/new', experimentController.putNewExperiment);

// //test

// //router.post('/experiment/new', (req, res)=>{res.json('hello')});

// /**
//  * POST the new update of a experiment identified by id
//  * @route POST /experiment/update/:id
//  * @group write - Write experiment data
//  * @param {number} id.param.required - id of the experiment to be updated
//  * @returns {object} 200 - An object containing data of the newly updated experiment
//  * @returns {Error}  default - Unexpected error
//  */
// router.post('/experiment/update/:id', experimentController.updateExperimentById);

// module.exports = router;