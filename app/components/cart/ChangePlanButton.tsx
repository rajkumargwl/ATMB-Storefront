import {useNavigate} from '@remix-run/react';

function ChangePlanButton({
  lineId,
  productHandle,
  locationId,
}: {
  lineId: string;
  productHandle: string;
  locationId?: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Store the old line ID in session to replace later
    sessionStorage.setItem('replaceLineId', lineId);

    // Optionally store locationId for PDP pre-selection
    if (locationId) {
      sessionStorage.setItem('selectedLocationId', locationId);
    }

    // Redirect to PDP page
    if(productHandle==='virtual-mailbox'){
        navigate(`/PDP/${productHandle}?locationId=${locationId || ''}`);
    }else{
        navigate(`/PDP/${productHandle}`);
    }
   
  };

  return (
    <button
      type="button"
      className="text-sm font-bold hover:underline"
      onClick={handleClick}
    >
      Change Plan
    </button>
  );
}

export default ChangePlanButton;
