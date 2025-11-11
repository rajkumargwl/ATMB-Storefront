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
      className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px] md:tracking-[0.07px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto"
      onClick={handleClick}
      aria-label="Change your billing plan"
    >
      Change Plan
    </button>
  );
}

export default ChangePlanButton;
