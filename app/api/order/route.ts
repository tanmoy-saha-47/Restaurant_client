import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Parse the incoming request body
    const body = await request.json();
    const { tableNumber, items } = body;

    if (!tableNumber || !items.length || items.length === 0) {
      return NextResponse.json(
        { message: "Missing table number or items" },
        { status: 400 } // Bad request
      );
    }

    const total = items.reduce(
      (acc: number, item: { price: number; quantity: number }) => {
        return acc + item.price * item.quantity;
      },
      0
    );

    const newOrder = {
      id: Date.now(), // A simple unique ID. uuidv4() is better for production.
      tableNumber,
      items,
      total,
      status: "Pending", // Set a default status
      createdAt: new Date().toISOString(), // Use ISO format for consistency
    };

    console.log(`New order recieved for table: ${tableNumber}`);
    console.log("New order created:", newOrder);

    //database logic

    //success response
    return NextResponse.json(
      { message: "Order created succesfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create Order: ", error);
    return NextResponse.json(
      { message: "An error occured in creating order" },
      { status: 500 } // internal server error
    );
  }
}
