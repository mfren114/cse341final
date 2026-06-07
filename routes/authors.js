const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");

router.get("/", authorsController.getAllAuthors);

router.get("/:id", authorsController.getAuthorById);

router.post("/", authorsController.createAuthor);
/* #swagger.tags = ['Authors']
   #swagger.description = 'Create a new author'
   #swagger.parameters.body = {
       in: 'body',
       required: true,
       schema: {
           $name: 'George Orwell',
           $biography: 'English novelist and essayist',
           $nationality: 'British'
       }
   }
*/

router.put("/:id", authorsController.updateAuthor);
/* #swagger.tags = ['Authors']
   #swagger.description = 'Update an existing author'
   #swagger.parameters.id = {
       in: 'path',
       required: true,
       type: 'string'
   }
   #swagger.parameters.body = {
       in: 'body',
       required: true,
       schema: {
           $name: 'Eric Arthur Blair',
           $biography: 'English novelist, essayist, journalist and critic',
           $nationality: 'British'
       }
   }
*/

router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
