import { Progress } from "@/components/ui/progress";
import { FC } from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrengthProps {
    password: string;
}

export const PasswordStrength: FC<PasswordStrengthProps> = ({ password }) => {
    const result = zxcvbn(password);
    const width = (result.score * 100) / 4;

    const progressColor = () => {
        let color = "";
        let label = "";
        let labelColor = "";

        switch (result.score) {
            case 0:
                color = "bg-gray-400";
                label = "Very Weak";
                labelColor = "text-gray-400";
                break;
            case 1:
                color = "bg-red-700";
                label = "Weak";
                labelColor = "text-red-700";
                break;
            case 2:
                color = "bg-amber-500";
                label = "Fair";
                labelColor = "text-amber-500";
                break;
            case 3:
                color = "bg-yellow-500";
                label = "Strong";
                labelColor = "text-yellow-500";
                break;
            case 4:
                color = "bg-green-500";
                label = "Very Strong";
                labelColor = "text-green-500";
                break;
            default:
                color = "none";
                break;
        }

        return { color, label, labelColor };
    };

    const { color, label, labelColor } = progressColor();
    return (
        <div>
            <Progress className="h-1" indicatorColor={color} value={width} />
            <div className={`flex justify-end text-xs ${labelColor} mt-1`}>
                {label}
            </div>
        </div>
    );
};
