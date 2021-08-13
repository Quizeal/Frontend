import { v4 as uuidv4 } from 'uuid';
import { SET_MYALERT, REMOVE_MYALERT } from './type';

export const setMyAlert =
  (msg, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_MYALERT,
      payload: { msg, id },
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
