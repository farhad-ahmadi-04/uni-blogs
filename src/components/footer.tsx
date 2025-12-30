function Footer() {
    return ( <footer>
        <div className="w-full h-20 flex items-center justify-center border-t mt-10">
            <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Uni-Blogs. All rights reserved.
            </p>
        </div>
    </footer> );
}

export default Footer;