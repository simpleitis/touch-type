"use client";

import { useEffect, useState } from "react";
import { checkOrderStatus } from "../../actions/payment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { paymentStates } from "@/app/helpers/paymentHelpers";
import LoadingSvgAnimated from "@/app/svg/LoadingSvgAnimated";

interface PaymentProcessingParams {
  params: { id: string };
}

export default function PaymentProcessing({ params }: PaymentProcessingParams) {
  const [statusImageSrc, setStatusImageSrc] = useState("/loading.lottie");
  const [loop, setLoop] = useState(true);

  let intervalId: NodeJS.Timeout;

  const router = useRouter();

  async function fetchOrderInfo() {
    const paymentInfo = await checkOrderStatus(params.id);

    if (paymentInfo?.status !== paymentStates.paymentPending) {
      if (paymentInfo?.status === paymentStates.paymentSuccess) {
        setLoop(false);
        setStatusImageSrc("/tick.lottie");
      } else if (paymentInfo?.status === paymentStates.paymentFailure) {
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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <LoadingSvgAnimated
        key={statusImageSrc}
        imageSrc={statusImageSrc}
        loop={loop}
      />
      <p className="text-xl">
        <span className="text-xl font-bold">Payment processing!</span> Please
        don't close this page. You will be auto redirected to home page.
      </p>
    </div>
  );
}
