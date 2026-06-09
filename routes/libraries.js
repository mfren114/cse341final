const express = require("express");
const router = express.Router();

const librariesController = require("../controllers/libraries");

router.get("/", librariesController.getAllLibraries);

router.get("/:id", librariesController.getLibraryById);

router.post("/", librariesController.createLibrary);
/* #swagger.tags = ['Libraries']
   #swagger.description = 'Create a new library'
   #swagger.parameters.body = {
       in: 'body',
       required: true,
       schema: {
           $name: 'Central Library',
           $location: 'Downtown',
           $booksAvailable: 1200,
           $isOpen: true
       }
   }
*/

router.put("/:id", librariesController.updateLibrary);
/* #swagger.tags = ['Libraries']
   #swagger.description = 'Update an existing library'
   #swagger.parameters.id = {
       in: 'path',
       required: true,
       type: 'string'
   }
   #swagger.parameters.body = {
       in: 'body',
       required: true,
       schema: {
           $name: 'Updated Library',
           $location: 'New Location',
           $booksAvailable: 1500,
           $isOpen: false
       }
   }
*/

router.delete("/:id", librariesController.deleteLibrary);

module.exports = router;
