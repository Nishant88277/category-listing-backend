const fs = require('fs-extra');
class BaseController {

  static validationResponse(message, res, tag, status_code = 400) {
    let response = {
      "status": status_code,
      "message": message
    };
    res.status(status_code).send(response);
  }

  static errorResponse(message, res, status_code = 400) {
    let response = {
      "status": status_code,
      "message": message
    };
    return res.status(status_code).jsonp(response);
  }

  static successResponse(data, status_code, message, res, extras) {
    let response = {
      "data": data,
      "meta": {
        "status": status_code,
        "message": message,
      }
    };

    if (extras) {
      for (var k in extras) {
        response.meta.perPage = extras['perPage'];
        response.meta.page = extras['page'];
        response.meta.total = extras['total'];
      }
    }
    return res.send(response);
  }

  static successResponseWithoutData(message, code = status.Success, res) {
    let response = {
      'data': null,
      'meta': {
        'status': code,
        'message': message
      }
    };
    return res.send(response);
  }

  static randomString(length) {
    let result = '';
    let chars = '01234abcdefghijklmnopqrstuvwxyz56789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  static deleteFile(file) {
    let path = './public/image/' + file;
    return new Promise((resolve, reject) => {
      fs.exists(path, (exists) => {
        if (exists) {
          fs.unlink(path, async (err) => {
            if (err) {
              reject(err);
            }
            else {
              resolve(true);
            }
          });
        }
        else {
          resolve(false);
        }
      }, err => {
        reject(err);
      });
    });
  }

  static sendEmail(data, type) {

    let mapObj = {};
    return new Promise((resolve) => {

      let fileName = '';
      let emailSubject = '';
      switch (type) {
        case 'forgot-password' :
          fileName = 'admin_forgot_password.html';
          emailSubject = 'Intellope Verification to Reset Your Password';
          mapObj = {
            '::NAME': data.first_name + ' ' + data.last_name,
            '::LINK': data.link,
          };
          break;

        default :
          break;
      }


      let nodemailer = require('nodemailer');
      let FROM_ADDRESS = process.env.SMTP_fromEmail;
      let TO_ADDRESS = data.email;
      let smtpTransport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        tls: true,
        // service: 'smtp',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });


      let sendMail = function (toAddress, subject, content, next) {
        let mailOptions = {
          from: FROM_ADDRESS,
          to: toAddress,
          replyTo: FROM_ADDRESS,
          subject: subject,
          html: content
        };
        smtpTransport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('error1', error);
            resolve(false);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(true);
          }
        })
      };

      let fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, '../../resources/views/templates/' + fileName);
      fs.readFile(filePath, 'utf8', function (err, file) {
        if (err) {
          console.log('error2', err);
          resolve(false);
        }
        else {
          let mailContent;

          mailContent = file.replace(/::PATH|::LINK|::NAME/gi, function (matched) {
            return mapObj[matched];
          });

          sendMail(TO_ADDRESS, emailSubject, mailContent, function (err, response) {
            if (err) {
              console.log('error3', err);
              resolve(err);
            }
            if (response) {
              resolve(true);
            }
          });
        }
      });
    });
  }
}

module.exports = BaseController;
