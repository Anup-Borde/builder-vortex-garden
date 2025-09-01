import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FibeLogo from '@/components/FibeLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F2F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <FibeLogo width={80} height={60} />
          </div>
          <CardTitle className="text-2xl font-bold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#666666]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="pt-4">
            <Link href="/signin">
              <Button className="w-full bg-[#079F9F] hover:bg-[#068585] text-white">
                Go to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
