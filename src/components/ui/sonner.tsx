import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            'min-w-[300px] max-w-[500px] px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 animate-[slideIn_0.3s_ease-out]',
          success:
            'bg-green-50 text-green-800 border border-green-200 [&>div]:text-green-800',
          error:
            'bg-red-50 text-red-800 border border-red-200 [&>div]:text-red-800',
          warning:
            'bg-yellow-50 text-yellow-800 border border-yellow-200 [&>div]:text-yellow-800',
          info: 'bg-blue-50 text-blue-800 border border-blue-200 [&>div]:text-blue-800',
          title: 'text-14r sm:text-16r whitespace-pre-line',
          closeButton:
            'text-current opacity-50 hover:opacity-100 transition-opacity shrink-0',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
