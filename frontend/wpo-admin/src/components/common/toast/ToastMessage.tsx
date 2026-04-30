import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toastTime } from "@/constants/stringConstants";

type ToastMessageProps = {
  message: string;
  type: "success" | "error" | "warning";
  onClose?: () => void;
};

type ToastVariant = ToastMessageProps["type"];

function getToastWrapperClass(variant: ToastVariant): string {
  switch (variant) {
    case "error":
      return "toast bg-red-600 text-white border-0 shadow-lg";
    case "warning":
      return "toast bg-blue-600 text-white border-0 shadow-lg";
    case "success":
    default:
      return "toast bg-green-600 text-white border-0 shadow-lg";
  }
}

function getHeaderTranslationKey(variant: ToastVariant): string {
  switch (variant) {
    case "error":
      return "messages.error.header";
    case "warning":
      return "messages.warning.header";
    case "success":
    default:
      return "messages.success.header";
  }
}

function getToastifyType(variant: ToastVariant): "success" | "error" | "warning" {
  switch (variant) {
    case "error":
      return "error";
    case "warning":
      return "warning";
    case "success":
    default:
      return "success";
  }
}

function ToastBody({
  headerText,
  messageText,
  closeToast,
}: Readonly<{
  headerText: string;
  messageText: string;
  closeToast: (reason?: boolean | string) => void;
}>) {
  return (
    <div className="flex min-w-[260px] max-w-[min(100vw-2rem,24rem)] flex-col gap-2 pe-2 sm:pe-1">
      <div className="flex items-start justify-between gap-2">
        <strong className="me-auto text-sm font-semibold leading-tight">{headerText}</strong>
        <button
          type="button"
          className="-me-1 -mt-0.5 shrink-0 rounded p-1 text-white opacity-90 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={() => {
            closeToast();
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <p className="text-start text-[15px] leading-snug text-white">{messageText}</p>
    </div>
  );
}

const ToastMessage = ({ message, type, onClose }: ToastMessageProps) => {
  const { t } = useTranslation();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const headerText = t(getHeaderTranslationKey(type));
    const wrapperClass = getToastWrapperClass(type);
    const toastifyType = getToastifyType(type);

    let notifiedClose = false;
    const notifyClosed = () => {
      if (notifiedClose) {
        return;
      }
      notifiedClose = true;
      onCloseRef.current?.();
    };

    const id = toast(
      ({ closeToast }) => (
        <ToastBody headerText={headerText} messageText={message} closeToast={closeToast} />
      ),
      {
        autoClose: toastTime,
        className: `${wrapperClass} relative rounded-md p-3`,
        icon: false,
        closeButton: false,
        type: toastifyType,
        position: "top-right",
        onClose: notifyClosed,
      },
    );

    const testFallbackTimer =
      import.meta.env.MODE === "test"
        ? globalThis.setTimeout(() => {
            if (toast.isActive(id)) {
              toast.dismiss(id);
            }
          }, toastTime + 150)
        : undefined;

    return () => {
      if (testFallbackTimer !== undefined) {
        globalThis.clearTimeout(testFallbackTimer);
      }
      toast.dismiss(id);
    };
  }, [message, type, t]);

  return (
    <div
      className="pointer-events-none fixed end-0 top-0 z-[1060] h-0 w-0 overflow-hidden"
      data-testid="toast-message"
      style={{ zIndex: 1060 }}
      aria-hidden
    />
  );
};

export default ToastMessage;
