import { sendMail } from '../../services/sendgrid'

const mapValues = (data) => {
  let finalString = '' 

  data.map((elem, index) => {
    let bodyString = `Informação ${index}`
    Object.keys(elem).map((key) => {

      switch (key) {
        case 'loc':
          bodyString = bodyString.concat(`&nbsp;&nbsp; 
            latitude =  ${elem['loc'].latitude}
            longitude = ${elem['loc'].longitude}          
          `)

          elem.loc = undefined
      }
      if (elem[key] !== undefined) {
        let tempString = ` <p> ${key} = ${elem[key]} </p> `
        bodyString = bodyString.concat(tempString)
      }
    })
    finalString = finalString.concat(bodyString)
  })
  
  return finalString;
}

export const create = ({
  bodymen: {
    body: {
      email,
      data
    }
  }
}, res, next) => {
  let bodyMail = ''
  let mappedArray = [];
  
  // const parsedJSON = JSON.parse(data)
  if (data instanceof Array) {
    bodyMail = mapValues(data)
  }  
  const content = `
        ${bodyMail}
      `
  sendMail({ toEmail: email, subject: 'ecomapss-api - Dados do app admin', content })
    .then((response) => response ? res.status(response.statusCode).end() : null)
    .catch(next)
}
