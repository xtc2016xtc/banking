"use server"


export const signIn = async () => {
  try {

  }catch (error) {
    console.log(error,'Error')
  }
}

export const signUp = async (userData:SignUpParams) => {
  try {
  console.log("userData:",JSON.stringify(userData))
  }catch (error) {
    console.log(error,'Error')
  }
}