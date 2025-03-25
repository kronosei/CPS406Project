import Link from "next/link";
import style from "./Button.module.css";

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({ text, href }: ButtonProps) {
  return (
    <Link href={href}>
      <button className={style.button}>{text}</button>
    </Link>
  );
}
