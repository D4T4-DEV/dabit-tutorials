import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateAvatarColors } from "@/utils/generateAvatarColors";
import AvatarBoring from "boring-avatars";
import { useMemo } from "react";

export const RenderAvatar = ({
  size = 32,
  seed = "Soy un pollo",
}: {
  seed: string;
  size?: number;
}) => {
  const avatarColors = useMemo(() => generateAvatarColors(seed), [seed]);

  return (
    <Avatar
      className="shrink-0 overflow-hidden rounded-full p-0"
      style={{ width: size, height: size }}
    >
      <AvatarFallback className="size-full overflow-hidden rounded-full bg-transparent p-0">
        <AvatarBoring
          size={size}
          name={seed}
          variant="beam"
          square={false}
          colors={avatarColors}
          className="block size-full!"
        />
      </AvatarFallback>
    </Avatar>
  );
};
