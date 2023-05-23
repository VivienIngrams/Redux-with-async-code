import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-tasks-a94be-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
      
      if (!response.ok) {
        throw new Error('Could not fetch cart data!')
        };
        const data = await response.json();

        return data;
      };
      try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart(cartData));
      } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Failed to fetch cart data!",
            })
          );
      }
  
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending ...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-tasks-a94be-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Failed to send cart data");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully sent cart data",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!",
        })
      );
    }
  };
};
