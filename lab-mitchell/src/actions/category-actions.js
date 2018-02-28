import uuid from 'uuid/v4';

//ASSUMING THAT WE WILL BE PASSING CATEGORY AS AN ENTIRE OBJECT WITH CAPTURED FORM FIELD DATA, APPENDING ID AND TIMESTAMP ON IT, AND SENDING IT OFF TO THE STORE, PASSING THE ENTIRE CATEGORY THING AS THE PAYLOAD

export const categoryCreate = category => {
  category.id = uuid();
  category.timestamp = new Date(); //for example only
  return { // THIS IS THE ACTUAL ACTION, HAS TYPE AND PAYLOAD
    type: 'CATEGORY_CREATE',
    payload: category,
  };
};

export const categoryUpdate = category => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const categoryDelete = category => ({
  type: 'CATEGORY_DELETE',
  payload: category,
});

export const categoryReset = () => ({type: 'CATEGORY_RESET'});