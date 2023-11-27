import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
  const jwt = request.cookies.get("access_token");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/Login/Login", request.url));
  }

  // try {
  //   const response = await axios.post(
  //     "http://localhost:3000/api/autenticacion/verify",
  //     {
  //       "access_token": jwt.value
  //   }
  //   );
  //   console.log("response", response);
  //   if (response.status === 201) {
  //     const data = response.data;
  //     if (data.isValid) {
  //       return NextResponse.next();
  //     } else {
  //       throw new Error("Token inválido");
  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.redirect(new URL("/Login/Login", request.url));
  // }
}

export const config = {
  matcher: ["/", "/Home/:path*"],
};
