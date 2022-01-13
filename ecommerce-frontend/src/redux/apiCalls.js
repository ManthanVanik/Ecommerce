import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, registerSuccess , logout} from "./userRedux"
import {addProduct,clearProduct}  from "./cartRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user)
        localStorage.setItem("token", res.data.accessToken);
        // console.log(res.data._id);
        dispatch(loginSuccess(res.data));
        // getcart(dispatch, res.data._id);
    }
    catch(err){
        console.log(err.response)
        // console.log(err)
        dispatch(loginFailure())
    }
}

export const logoutuser = async (dispatch) => {
    dispatch(logout());
    localStorage.clear();
}

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/register",user)
        localStorage.setItem("token", res.data.accessToken);
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        // console.log(err.response)
        dispatch(loginFailure())
    }
}

export const updateuser = async (dispatch, userid, user) => {
    // dispatch(loginStart());
    try{
        const res = await userRequest.put(`/users/user/${userid}`,user)
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        console.log(err.response)
        // dispatch(loginFailure())
    }
}

export const updatepassword = async (dispatch, userid, password) => {
    // dispatch(loginStart());
    try{
        const res = await userRequest.put(`/users/password/${userid}`,password)
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        console.log(err.response)
        // dispatch(loginFailure())
    }
}

export const updateaddress = async (dispatch, userid ,address) => {
    // dispatch(loginStart());
    try{
        const res = await userRequest.put(`/users/address/${userid}`,address)
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        console.log(err.response)
        // dispatch(loginFailure())
    }
}

export const addtocart = async (dispatch, product) => {
    console.log(product);
    try{
        const res = await userRequest.post("/carts",product)
        dispatch(addProduct(res.data));
    }
    catch(err){
        // console.log("called")
        console.log(err.response)
    }
}

export const getcart = async (dispatch, userid) => {
    try{
        const res = await userRequest.get(`/carts/find/${userid}`)
        dispatch(addProduct(res.data));
    }
    catch(err){
        console.log(err.response)
    }
}

export const updatecart = async (dispatch, userid ,data) => {
    try{
        const res = await userRequest.put(`/carts/${userid}`, data)
        dispatch(addProduct(res.data));
    }
    catch(err){
        console.log(err.response)
    }
}

export const deletefromcart = async (dispatch, userid, productId) => {
    try{
        const res = await userRequest.delete(`/carts/${userid}/${productId}`)
        dispatch(addProduct(res.data));
    }
    catch(err){
        console.log(err.response)
    }
}

export const deletecart = async (dispatch, userid) => {
    try{
        const res = await userRequest.delete(`/carts/${userid}`)
        // console.log(res.data);
        dispatch(clearProduct());
    }
    catch(err){
        console.log(err.response)
    }
}



export const clearcart = async (dispatch) => {
    dispatch(clearProduct());
}
