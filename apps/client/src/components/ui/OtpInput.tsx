import { useRef, useState } from "react";

interface Props {
  length?: number;
  onComplete?: (otp: string) => void;
}

const OtpInput = ({ length = 6, onComplete }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // COMPLETE CALLBACK
  const triggerComplete = (values: string[]) => {
    const otpValue = values.join("");

    if (otpValue.length === length) {
      onComplete?.(otpValue);
    }
  };

  // CHANGE
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // Move next
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    triggerComplete(updatedOtp);
  };

  // KEYBOARD
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Backspace previous
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Right
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // PASTE
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasted)) return;

    const digits = pasted.slice(0, length).split("");

    const updatedOtp = Array(length)
      .fill("")
      .map((_, index) => digits[index] || "");

    setOtp(updatedOtp);

    triggerComplete(updatedOtp);

    // Focus last input
    const lastIndex = Math.min(digits.length, length) - 1;

    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="
            aspect-square
            w-full
            max-w-[56px]
            border
           border-[#e5e7eb]
        bg-white
            text-center
            text-lg
            font-medium
            text-white
            outline-none
            transition-all
              focus:border-[#b8bec8]
        focus:ring-1
        focus:ring-[#d1d5db]
          "
        />
      ))}
    </div>
  );
};

export default OtpInput;
