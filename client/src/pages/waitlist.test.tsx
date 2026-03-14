import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Waitlist from "./waitlist";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});

const renderWaitlist = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Waitlist />
        </QueryClientProvider>
    );
};

// Mock fetch for the API call
global.fetch = jest.fn() as jest.Mock;
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe("Waitlist Landing Page", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it("renders the primary headline and email input", () => {
        renderWaitlist();
        expect(screen.getByText(/Get noticed/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter email here/i)).toBeInTheDocument();
    });

    it("shows error toast on invalid email submission", async () => {
        renderWaitlist();
        const input = screen.getByPlaceholderText(/Enter email here/i);
        const form = input.closest('form');

        // Attempt invalid email
        fireEvent.change(input, { target: { value: 'invalid-email' } });
        if (form) fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });

    it("shows success state when valid email is submitted", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "123", email: "test@example.com" }),
        });

        renderWaitlist();
        const input = screen.getByPlaceholderText(/Enter email here/i);
        const form = input.closest('form');

        // Input valid email
        fireEvent.change(input, { target: { value: 'test@gidi.go' } });
        if (form) fireEvent.submit(form);

        // Should call API
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/waitlist", expect.objectContaining({
                method: "POST",
                body: expect.stringContaining("test@gidi.go"),
            }));
        });

        // Should show success UI
        await waitFor(() => {
            expect(screen.getByText(/You're on the list/i)).toBeInTheDocument();
        });
    });
});
