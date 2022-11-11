import axios from "axios";
// constants
const initialData = {
  arraySimilares: [],
  arrayExactos: [],
  loading: false
};
const GET_PROCEDURES_SIMILAR_SUCCESSFUL = "GET_PROCEDURES_SIMILAR_SUCCESSFUL"
const GET_PROCEDURES_EXACTLY_SUCCESSFUL = "GET_PROCEDURES_EXACTLY_SUCCESSFUL"
const GET_PROCEDURES_LOADING = "GET_PROCEDURES_LOADING"
const ERROR = "ERROR";
// reducers
export default function procedimientosReducer(state = initialData, action={}) {
  switch (action.type) {
    case GET_PROCEDURES_SIMILAR_SUCCESSFUL:
      return { ...state, arraySimilares:action.payload, loading: action.loading};
    case GET_PROCEDURES_EXACTLY_SUCCESSFUL:
      return { ...state, arrayExactos:action.payload, loading: action.loading};
    case GET_PROCEDURES_LOADING:
      return { ...state,  loading:action.payload };
    case ERROR:
      return { ...state, error:true };
    default:
      return state;
  }
}
// actions
export const obtenerProcedimientosSimilares = () => async (dispatch, getState) => {
  try {
    dispatch({
      type:GET_PROCEDURES_LOADING,
      payload: true
    })

    const procedimientos = await axios.get(`http://127.0.0.1:8000/similares`);
    const procedimientos_similares = Object.values(procedimientos.data)
    dispatch({
      type: GET_PROCEDURES_SIMILAR_SUCCESSFUL,
      payload: procedimientos_similares,
      loading: false
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {error:true},
    });
  }
};

export const obtenerProcedimientosExactos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type:GET_PROCEDURES_LOADING,
      payload: true
    })

    const procedimientos = await axios.get(`http://127.0.0.1:8000/exactos`);
    const procedimientos_exactos = Object.values(procedimientos.data)
    dispatch({
      type: GET_PROCEDURES_EXACTLY_SUCCESSFUL,
      payload: procedimientos_exactos,
      loading: false
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {error:true},
    });
  }
};