import { Check, CheckCircle, Heart, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { RegisterUser } from "../interfaces/auth.interface";

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        consent: false,
        privacyAgreed: false,
    });

    const [formError, setFormError] = useState("")
    const navigate = useNavigate();
    const { register, isLoading, error: authError, clearError } = useAuth();

    const totalSteps = 2;
    const progress = (currentStep / totalSteps) * 100;

    const handleLogin = () => {
        navigate("/login");
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const verifyDetails = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Clear any previous auth errors
        if (authError) {
            clearError();
        }
        
        // Check if any required field is empty
        if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
            setFormError("Please fill in all required fields");
            return;
        }
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError("Please enter a valid email address");
            return;
        }

        // Password strength validation
        if (formData.password.length < 6) {
            setFormError("Password must be at least 6 characters long");
            return;
        }
        
        // Clear error and proceed to next step
        setFormError("");
        nextStep();
    }

    const handleSubmit = async () => {
        if (formData.consent && formData.privacyAgreed) {
            // Clear any previous errors
            setFormError("");
            if (authError) {
                clearError();
            }

            // Prepare registration data
            const userData: RegisterUser = {
                name: formData.name.trim(),
                emailAddress: formData.email.trim(),
                password: formData.password,
            };

            try {
                await register(userData);
                // Navigation is handled by the useAuth hook after successful registration
            } catch (error) {
                // Error is handled by the useAuth hook
                console.error("Registration failed:", error);
            }
        }
    }

    // Get the current error to display (form error takes priority over auth error)
    const displayError = formError || authError;

    const renderStepOne = () => (
        <div
            id="onboardingCard"
            className="rounded-lg w-[95%] md:w-full max-w-2xl m-auto p-4 text-card-foreground flex flex-col gap-4"
        >
            <div id="cardHeader" className="flex flex-col gap-2 mt-2">
                <div
                    id="progressBar"
                    aria-valuemax={100}
                    aria-valuemin={0}
                    role="progressbar"
                    data-state="indeterminate"
                    data-max="100"
                    className="relative h-4 overflow-hidden rounded-full bg-secondary w-full"
                >
                    <div
                        id="progressBarFiller"
                        data-state="indeterminate"
                        data-max="100"
                        className="h-full w-full flex-1 bg-primary transition-all"
                        style={{ transform: "translateX(-50%)" }}
                    ></div>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        Step {currentStep} of {totalSteps}
                    </h3>
                </div>
            </div>
            <div id="cardBody" className="flex flex-col gap-4">
                <div className="text-center flex flex-col gap-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-primary " />
                    </div>
                    <h2 className="text-2xl font-semibold">Welcome to Calma</h2>
                    <p className="text-muted-foreground">
                        Let's create your account to begin your mental health
                        journey
                    </p>
                </div>
                <form
                    id="stepOneForm"
                    className=" p-4 flex flex-col w-full mx-auto gap-3"
                >
                    <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e)=> setFormData({...formData, name:e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="email"
                    >
                        Email Address{" "}
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e)=> setFormData({...formData, email:e.target.value})}
                    />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e)=> setFormData({...formData, password:e.target.value})}
                        required
                    />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e)=> setFormData({...formData, confirmPassword:e.target.value})}
                        required
                    />
                    {displayError && (
                        <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                            {displayError}
                        </div>
                    )}
                    <p className="self-end flex">
                        Already have an account?
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="justify-end mx-2 text-primary hover:underline"
                        >
                            Login
                        </button>
                    </p>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        onClick={verifyDetails}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );

    const renderStepTwo = () => (
        <div className="consentCard flex flex-col gap-5 px-2">
            <div className="cardHeader">
                <div className="flex flex-col gap-2 mt-2">
                    <div
                        id="progressBar"
                        aria-valuemax={100}
                        aria-valuemin={0}
                        role="progressbar"
                        data-state="indeterminate"
                        data-max="100"
                        className="relative h-4 overflow-hidden rounded-full bg-secondary w-full"
                    >
                        <div
                            id="progressBarFiller"
                            data-state="indeterminate"
                            data-max="100"
                            className="h-full w-full flex-1 bg-primary transition-all"
                            style={{ transform: `translateX(${progress - 100}%)` }}
                        ></div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">
                            Step {currentStep} of {totalSteps}
                        </h3>
                    </div>
                </div>
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 mt-5 rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">
                        Privacy & Consent
                    </h2>
                    <p className="text-muted-foreground">
                        Your privacy and security are our top priorities
                    </p>
                </div>
            </div>
            <div className="cardBody flex flex-col gap-2">
                <div id="sectionOne" className="border-primary/20 bg-primary/5">
                    <div className="p-6">
                        <h3 className="font-semibold text-primary mb-3">
                            How We Protect Your Data
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    All personal and health data is encrypted
                                    using industry-standard protocols
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    Your therapeutic conversations are
                                    end-to-end encrypted
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    We never share your data without explicit
                                    consent
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    You can export or delete your data at any
                                    time
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="sectionTwo" className="">
                    <div className="space-y-4 p-4 rounded-xl bg-background">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <input
                                    id="privacy"
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.privacyAgreed}
                                    onChange={(e) => setFormData({...formData, privacyAgreed: e.target.checked})}
                                />
                                <div 
                                    onClick={() => setFormData({...formData, privacyAgreed: !formData.privacyAgreed})}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                                        formData.privacyAgreed 
                                            ? 'bg-primary border-primary' 
                                            : 'border-input hover:border-primary/50'
                                    }`}
                                >
                                    {formData.privacyAgreed && (
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="privacy"
                                    className="text-sm font-medium"
                                >
                                    I have read and agree to the Terms of
                                    Service and Privacy Policy
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    By checking this box, you acknowledge that
                                    you understand how your data will be used
                                    and protected.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                                />
                                <div 
                                    onClick={() => setFormData({...formData, consent: !formData.consent})}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                                        formData.consent 
                                            ? 'bg-primary border-primary' 
                                            : 'border-input hover:border-primary/50'
                                    }`}
                                >
                                    {formData.consent && (
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="consent"
                                    className="text-sm font-medium"
                                >
                                    I consent to the processing of my personal
                                    and health data as described
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    This consent is required to provide you with
                                    personalized mental health support and
                                    insights.
                                </p>
                            </div>
                        </div>
                    </div>

                    {displayError && (
                        <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-md mx-4">
                            {displayError}
                        </div>
                    )}

                    <div className="flex gap-4 mb-2 p-2">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="h-9 px-4 py-2 rounded-md flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            disabled={isLoading}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`h-9 px-4 py-1 rounded-md flex-1 transition-colors ${
                                !formData.consent || !formData.privacyAgreed || isLoading
                                    ? 'bg-background text-gray-500 cursor-not-allowed'
                                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                            disabled={
                                !formData.consent || !formData.privacyAgreed || isLoading
                            }
                        >
                            {isLoading ? 'Creating Account...' : 'Complete Setup'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div
                id="onboardingContainer"
                className="min-w-screen min-h-screen flex justify-center"
            >
                <div className="stepContainer rounded-lg bg-card w-[95%] md:w-full max-w-2xl m-auto border border-input text-card-foreground shadow-xs flex flex-col">
                    {currentStep === 1 && renderStepOne()}
                    {currentStep === 2 && renderStepTwo()}
                </div>
            </div>
        </>
    );
};

export default OnboardingPage;