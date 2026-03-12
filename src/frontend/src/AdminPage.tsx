import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertCircle,
  InboxIcon,
  Loader2,
  Lock,
  LogOut,
  Phone,
  RefreshCw,
  ShieldCheck,
  Tv,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

const ADMIN_PASSWORD = "shashi123";

interface LocalBooking {
  id: number;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  message: string;
  timestamp: string;
}

function formatTimestamp(ts: string | bigint): string {
  try {
    if (typeof ts === "bigint") {
      return new Date(Number(ts / 1_000_000n)).toLocaleString();
    }
    return new Date(ts).toLocaleString();
  } catch {
    return "—";
  }
}

function loadBookings(): LocalBooking[] {
  try {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  } catch {
    return [];
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [bookings, setBookings] = useState<LocalBooking[]>([]);
  const [isLoading] = useState(false);
  const isError = false;

  const refetch = () => {
    setBookings(loadBookings());
  };
  const isRefetching = false;

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setLoginError(false);
        setBookings(loadBookings());
      } else {
        setLoginError(true);
        setPasswordInput("");
      }
    },
    [passwordInput],
  );

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPasswordInput("");
    setLoginError(false);
  }, []);

  const currentYear = new Date().getFullYear();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 font-body">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <div className="bg-navy-900 border border-navy-800 rounded-2xl shadow-[0_24px_64px_oklch(10%_0.07_255_/_0.5)] p-6 sm:p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center mb-4 shadow-[0_4px_24px_oklch(72%_0.19_62_/_0.4)]">
                <Tv className="w-7 h-7 text-navy-950" />
              </div>
              <h1 className="font-display font-extrabold text-white text-2xl tracking-tight">
                Shashi <span className="text-amber-500">Electronics</span>
              </h1>
              <p className="text-navy-400 text-sm mt-1">Admin Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="admin-password"
                  className="text-navy-200 font-medium"
                >
                  Admin Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                  <Input
                    id="admin-password"
                    data-ocid="admin.password.input"
                    type="password"
                    placeholder="Enter admin password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    required
                    className="pl-10 h-12 text-base bg-navy-800 border-navy-700 text-white placeholder:text-navy-500 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="admin.login.error_state"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Incorrect password. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                data-ocid="admin.login.submit_button"
                className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base shadow-[0_4px_24px_oklch(72%_0.19_62_/_0.35)]"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                data-ocid="admin.back_to_site.link"
                className="text-navy-400 hover:text-amber-400 transition-colors text-sm"
              >
                ← Back to website
              </a>
            </div>
          </div>

          <p className="text-center text-navy-600 text-xs mt-6">
            © {currentYear} Shashi Electronics. Admin access only.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Admin Header */}
      <header className="bg-navy-950 border-b border-navy-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center shrink-0">
              <Tv className="w-4 h-4 text-navy-950" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight">
                Shashi <span className="text-amber-500">Electronics</span>
              </span>
              <span className="ml-2 text-xs text-navy-400 font-medium bg-navy-800 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              data-ocid="admin.view_site.link"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-amber-400 transition-colors font-medium"
            >
              View Website
            </a>
            <Button
              data-ocid="admin.logout.button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-navy-700 text-navy-200 hover:text-white hover:bg-navy-800 hover:border-navy-600 h-9"
            >
              <LogOut className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h2 className="font-display font-extrabold text-foreground text-2xl sm:text-3xl">
              Booking Requests
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              All customer repair requests submitted through the website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {bookings && (
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                {bookings.length} total booking
                {bookings.length !== 1 ? "s" : ""}
              </span>
            )}
            <Button
              data-ocid="admin.refresh.button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading || isRefetching}
              className="border-border text-foreground hover:bg-muted h-9"
            >
              {isRefetching ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1.5" />
              )}
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Loading State */}
        {(isLoading || isRefetching) && (
          <div
            data-ocid="admin.bookings.loading_state"
            className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          >
            <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-3" />
            <p className="text-sm font-medium">Loading bookings…</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div
            data-ocid="admin.bookings.error_state"
            className="flex flex-col items-center justify-center py-20 text-center px-6"
          >
            <div className="w-14 h-14 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-4">
              <AlertCircle className="w-7 h-7 text-destructive" />
            </div>
            <p className="font-display font-bold text-foreground text-lg mb-2">
              Failed to load bookings
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              There was a problem connecting to the backend. Please try
              refreshing.
            </p>
            <Button
              data-ocid="admin.error_retry.button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !isRefetching &&
          !isError &&
          bookings &&
          bookings.length === 0 && (
            <div
              data-ocid="admin.bookings.empty_state"
              className="flex flex-col items-center justify-center py-20 text-center px-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <InboxIcon className="w-7 h-7 text-amber-500" />
              </div>
              <p className="font-display font-bold text-foreground text-lg mb-2">
                No bookings yet
              </p>
              <p className="text-muted-foreground text-sm max-w-xs">
                Submitted bookings will appear here once customers start using
                the booking form.
              </p>
            </div>
          )}

        {/* Bookings content */}
        {!isLoading &&
          !isRefetching &&
          !isError &&
          bookings &&
          bookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              data-ocid="admin.bookings.table"
            >
              {/* Mobile Card View — shown on small screens */}
              <div className="md:hidden space-y-3">
                {bookings.map((booking, index) => (
                  <div
                    key={`${booking.customerName}-${booking.timestamp}-${index}`}
                    data-ocid={`admin.bookings.row.${index + 1}`}
                    className="bg-card border border-border rounded-xl p-4 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-display font-bold text-foreground text-base">
                          {booking.customerName}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-500/10 text-amber-600 text-xs font-semibold rounded-full">
                          {booking.serviceType}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md shrink-0">
                        #{index + 1}
                      </span>
                    </div>

                    <a
                      href={`tel:${booking.phoneNumber}`}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-500 font-medium text-sm mb-3 min-h-[36px]"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      {booking.phoneNumber}
                    </a>

                    {booking.message && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3 border-t border-border pt-3">
                        {booking.message}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(booking.timestamp)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View — hidden on small screens */}
              <div className="hidden md:block bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40 hover:bg-muted/40 border-border">
                        <TableHead className="w-12 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                          #
                        </TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                          Customer Name
                        </TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                          Phone Number
                        </TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                          Service Type
                        </TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                          Message
                        </TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                          Date & Time
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, index) => (
                        <TableRow
                          key={`${booking.customerName}-${booking.timestamp}-${index}`}
                          data-ocid={`admin.bookings.row.${index + 1}`}
                          className="border-border hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="text-muted-foreground text-sm font-mono">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">
                            {booking.customerName}
                          </TableCell>
                          <TableCell>
                            <a
                              href={`tel:${booking.phoneNumber}`}
                              className="text-amber-600 hover:text-amber-500 font-medium transition-colors"
                            >
                              {booking.phoneNumber}
                            </a>
                          </TableCell>
                          <TableCell className="text-foreground">
                            {booking.serviceType}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-xs">
                            <span className="line-clamp-2">
                              {booking.message}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                            {formatTimestamp(booking.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}
      </main>
      <footer className="max-w-7xl mx-auto px-4 lg:px-8 py-6 mt-4">
        <p className="text-center text-muted-foreground text-xs">
          © {currentYear} Shashi Electronics. Admin Panel.
        </p>
      </footer>
    </div>
  );
}
