const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const BaseController = require('./BaseController');
const db = require('../../models');
const { responseStatus, status } = require('../../services/status');
const constants = require('../../services/constants');

module.exports = {

  create_category: async (req, res) => {
    const { message } = global;
    const inputs = {
      name: req.body.name,
      parentId: req.body.parentId
    };
    db.manage_categories.create({ name: inputs.name, parent_id: inputs.parentId  })
      .then((category) => {
        if(category){
          return BaseController.successResponse(
            null,
            status.Success,
            message.success,
            res
          );
        } else {
          BaseController.errorResponse(
            message.somethingWentWrong,
            res,
            responseStatus.InternalServerError
          );
        }
      })
  },

  get_category: (req, res) => {
    const message = global.message;
    db.manage_categories
      .findAll({
        raw: true,
        attributes: {
          include: [
            "id",
            "name",
            "parent_id"
          ]
        },
      }).then((parentCategory) => {
      function getNestedChildren(arr, parent_id) {
        let out = []
        for (var i in arr) {
          if (arr[i].parent_id === parent_id) {
            var children = getNestedChildren(arr, arr[i].id)

            if (children.length) {
              arr[i].subCate = children
            }
            out.push(arr[i])
          }
        }
        return out
      }
      console.log(JSON.stringify(getNestedChildren(parentCategory, null)))
      return BaseController.successResponse(
        getNestedChildren(parentCategory, null),
        status.Success,
        message.success,
        res
      );
    })
  },

  update_category: async (req, res) => {
    const { message } = global;
    const inputs = {
      name: req.body.name,
      id: req.body.id
    };
    db.manage_categories.update(
      {
        name: inputs.name
      },
      { where: { id: inputs.id } }
    )
      .then((updatedCategory) => {
        if(updatedCategory){
          return BaseController.successResponse(
            null,
            status.Success,
            message.success,
            res
          );
        } else{
          BaseController.errorResponse(
            message.somethingWentWrong,
            res,
            responseStatus.InternalServerError
          );
        }
      })
  },

  delete_category: async (req, res) => {
    const { message } = global;
    const inputs = {
      id: req.body.id
    };
    db.manage_categories.destroy({
      where: {
        id: inputs.id,
        subid: inputs.subid,
      }
    }).then((Delete) => {
      if(Delete){
        db.manage_categories.destroy({
          where: {
            parent_id: inputs.id
          }
        })
        db.manage_categories.destroy({
          where: {
            parent_id: inputs.id
          }
        })
        return BaseController.successResponse(
          null,
          status.Success,
          message.success,
          res
        );
      } else{
        BaseController.errorResponse(
          message.somethingWentWrong,
          res,
          responseStatus.InternalServerError
        );
      }
    })
  },



};
