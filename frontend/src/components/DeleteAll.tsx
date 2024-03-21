import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";

export default function DeleteAll() {

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/user/delete`)
    .then((response) => {
      console.log(response.data);
    })
  }
  , [])
  return (
    <div></div>
  )
}
