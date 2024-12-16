"use server";

export async function sendMessage() {
  // console.log("sendMessage message:", content);
  // return { message: "Hello, World!" };

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // response to json
    console.log(response);

    return {
      message: response,
    };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }

  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: content }),
  //   });
  //   console.log("sendMessage response:", response);
  //   return response;
  // } catch (error) {
  //   console.error("Error in sendMessage:", error);
  //   throw error;
  // }
}
