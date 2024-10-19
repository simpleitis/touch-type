"use client";

import { useEffect, useState } from "react";
import { checkOrderStatus } from "../../actions/payment";
import { useRouter } from "next/navigation";
import { paymentStates } from "@/app/helpers/paymentHelpers";
import LoadingSvgAnimated from "@/app/svg/LoadingSvgAnimated";

interface PaymentProcessingParams {
  params: { id: string };
}

export default function PaymentProcessing({ params }: PaymentProcessingParams) {
  const [statusImageSrc, setStatusImageSrc] = useState("/loading.lottie");
  const [loop, setLoop] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(
    paymentStates.paymentPending,
  );

  let intervalId: NodeJS.Timeout;

  const router = useRouter();

  async function fetchOrderInfo() {
    const paymentInfo = await checkOrderStatus(params.id);

    if (paymentInfo?.status !== paymentStates.paymentPending) {
      if (paymentInfo?.status === paymentStates.paymentSuccess) {
        setLoop(false);
        setStatusImageSrc("/success.lottie");
        setPaymentStatus(paymentStates.paymentSuccess);
      } else if (paymentInfo?.status === paymentStates.paymentFailure) {
        setStatusImageSrc("/error.lottie");
        setPaymentStatus(paymentStates.paymentFailure);
      }

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }

  useEffect(() => {
    intervalId = setInterval(() => {
      fetchOrderInfo();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let statusMessageJsx = (
    <p className="text-xl">
      <span className="text-xl font-bold">Payment processing!</span> Please
      don't close this page. You will be auto redirected to home page, once
      payment is processed.
    </p>
  );
  if (paymentStatus === paymentStates.paymentSuccess) {
    statusMessageJsx = (
      <p className="text-xl">
        <span className="text-xl font-bold">Payment success!</span> Redirecting
        you in 3 seconds
      </p>
    );
  } else if (paymentStatus === paymentStates.paymentFailure) {
    statusMessageJsx = (
      <p className="text-xl">
        <span className="text-xl font-bold">Payment failed!</span> Redirecting
        you in 3 seconds
      </p>
    );
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <LoadingSvgAnimated
        key={statusImageSrc}
        imageSrc={statusImageSrc}
        loop={loop}
      />
      {statusMessageJsx}
    </div>
  );
}
