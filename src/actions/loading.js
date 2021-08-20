import { LOADIND_STATUS } from './type';

export const setLoading = (status) => (dispatch) => {
  dispatch({
    type: LOADIND_STATUS,
    payload: status,
  });
};
