import { v4 as uuidv4 } from 'uuid';
import { SET_MYALERT, REMOVE_MYALERT } from './type';

export const setMyAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4(); //RANDOM LONG STRING
    dispatch({
      type: SET_MYALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_MYALERT,
          payload: id,
        }),
      timeout
    );
  };
