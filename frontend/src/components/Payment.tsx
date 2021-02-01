import { useHistory } from "react-router-dom";
import PaymentService from "../services/PaymentService";

interface PaymentProps {
  getUserData: any;
}

const Payment: React.FC<PaymentProps> = ({ getUserData }) => {
  const history = useHistory();
  const handlePayment = async () => {
    await PaymentService.paySubscription();
    getUserData();
    history.push("/user");
  };

  return (
    <div className="row justify-content-between container mx-auto">
      <div>HERE GOES THE PAYMENT FORM</div>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay subscription
      </button>
    </div>
  );
};

export default Payment;
