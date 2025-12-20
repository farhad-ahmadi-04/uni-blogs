import { cn } from "@/lib/utils";


/**
 * A presentational wrapper that centers content and applies horizontal padding.
 *
 * The component renders a div using Tailwind CSS utility classes "container mx-auto px-4"
 * by default and merges any additional classes passed via the `className` prop.
 * Useful for creating a consistent page or section width and centering layout.
 *
 * @param props.children - The content to render inside the container. Typically React nodes.
 * @param props.className - Optional additional CSS class names to extend or override styling.
 *
 * @returns A React element (div) that wraps the provided children with container styling.
 *
 * @remarks
 * This component expects a `cn` (class name merging) utility to be available in scope
 * to combine the default classes with any provided `className`.
 */
function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("w-full  xl:max-w-7xl mx-auto px-4", className)}>
            {children}
        </div>
    );
}

export default Container;