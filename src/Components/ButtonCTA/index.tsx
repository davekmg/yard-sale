import { ButtonCTAProps } from "./types";
import TagManager from 'react-gtm-module';

export const ButtonCTA: React.FC<ButtonCTAProps> = ({
  ItemId,
  dispatch,
  added,
  content,
  onclick
}): JSX.Element => {
  const handleClick = () => {
    if(onclick) onclick()

    const action: string = added ? "REMOVE" : "ADD_TO_CART";
    dispatch && dispatch({ type: action, payload: ItemId })
   
    if (action == 'ADD_TO_CART') {
      //alert('Item Added: '+ItemId+', action:'+action);
      TagManager.dataLayer({
        dataLayer: {
          event: 'added_item_to_cart',
          item_id: ItemId
        }
      })
    } else if (action == 'REMOVE') {
      //alert('Removed Added: '+ItemId+', action:'+action);
      TagManager.dataLayer({
        dataLayer: {
          event: 'remove_item_from_cart',
          item_id: ItemId
        }
      })
    }//end if
  }

  return(
    <button className={`ButtonCTA ${added && "added"}`} onClick={handleClick}>
      {
        content ? content
        :
        added ? `Remove` : `Add to cart`
      }
    </button>
  )
}