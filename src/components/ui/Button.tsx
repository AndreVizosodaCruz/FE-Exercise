import './index.css'

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  type: "submit" | "reset" | "button" | undefined;
}

export default function Button({ text, isLoading = false, type }: ButtonProps) {

  return (<button disabled={isLoading} type={type}>
    {isLoading ? (
      <div className='spinner'></div>
    ) : text}
  </button>
  )
}
