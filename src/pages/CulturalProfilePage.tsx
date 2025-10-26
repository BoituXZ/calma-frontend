import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Home, Users, Heart, DollarSign, ArrowLeft, ArrowRight } from "lucide-react";
import { createCulturalProfile, getCulturalProfile, updateCulturalProfile } from "../services/culturalProfileService";
import type {
    AgeGroup,
    Location,
    EducationLevel,
    FamilyStructure,
    RespectLevel,
    EconomicStatus,
    CulturalProfile,
} from "../interfaces/culturalProfile.interface";

const CulturalProfilePage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [existingProfile, setExistingProfile] = useState<CulturalProfile | null>(null);

    const [formData, setFormData] = useState({
        // Step 1: Demographics
        ageGroup: "" as AgeGroup | "",
        location: "" as Location | "",
        educationLevel: "" as EducationLevel | "",

        // Step 2: Cultural
        ethnicBackground: "",
        religiousBackground: "",
        languagePreference: "",

        // Step 3: Family & Social
        familyStructure: "" as FamilyStructure | "",
        householdSize: 0,
        hasElders: false,
        communicationStyle: "",
        respectLevel: "" as RespectLevel | "",

        // Step 4: Economic
        economicStatus: "" as EconomicStatus | "",
        employmentStatus: "",
    });

    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    useEffect(() => {
        fetchExistingProfile();
    }, []);

    async function fetchExistingProfile() {
        try {
            setIsLoading(true);
            const profile = await getCulturalProfile();
            setExistingProfile(profile);

            // Populate form with existing data
            setFormData({
                ageGroup: profile.ageGroup,
                location: profile.location,
                educationLevel: profile.educationLevel,
                ethnicBackground: profile.ethnicBackground || "",
                religiousBackground: profile.religiousBackground || "",
                languagePreference: profile.languagePreference || "",
                familyStructure: profile.familyStructure,
                householdSize: profile.householdSize || 0,
                hasElders: profile.hasElders,
                communicationStyle: profile.communicationStyle || "",
                respectLevel: profile.respectLevel,
                economicStatus: profile.economicStatus,
                employmentStatus: profile.employmentStatus || "",
            });
        } catch (err) {
            // No existing profile is fine - user is creating new one
            console.log("No existing profile found");
        } finally {
            setIsLoading(false);
        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    }

    async function handleSubmit() {
        try {
            setIsSaving(true);
            setError(null);

            const profileData = {
                ageGroup: formData.ageGroup as AgeGroup,
                location: formData.location as Location,
                educationLevel: formData.educationLevel as EducationLevel,
                ethnicBackground: formData.ethnicBackground || undefined,
                religiousBackground: formData.religiousBackground || undefined,
                languagePreference: formData.languagePreference || undefined,
                familyStructure: formData.familyStructure as FamilyStructure,
                householdSize: formData.householdSize || undefined,
                hasElders: formData.hasElders,
                communicationStyle: formData.communicationStyle || undefined,
                respectLevel: formData.respectLevel as RespectLevel,
                economicStatus: formData.economicStatus as EconomicStatus,
                employmentStatus: formData.employmentStatus || undefined,
            };

            if (existingProfile) {
                await updateCulturalProfile(profileData);
            } else {
                await createCulturalProfile(profileData);
            }

            navigate("/app/settings");
        } catch (err) {
            console.error("Failed to save cultural profile:", err);
            setError(err instanceof Error ? err.message : "Failed to save cultural profile");
        } finally {
            setIsSaving(false);
        }
    }

    function validateStep(): boolean {
        setError(null);

        switch (currentStep) {
            case 1:
                if (!formData.ageGroup || !formData.location || !formData.educationLevel) {
                    setError("Please fill in all required fields");
                    return false;
                }
                break;
            case 3:
                if (!formData.familyStructure || !formData.respectLevel) {
                    setError("Please fill in all required fields");
                    return false;
                }
                break;
            case 4:
                if (!formData.economicStatus) {
                    setError("Please fill in all required fields");
                    return false;
                }
                break;
        }

        return true;
    }

    function handleNext() {
        if (validateStep()) {
            nextStep();
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <Globe className="w-12 h-12 mx-auto text-primary mb-2" />
                <h2 className="text-2xl font-semibold">Demographics</h2>
                <p className="text-muted-foreground">Help us understand your background</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Age Group *</label>
                <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as AgeGroup })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select age group</option>
                    <option value="YOUTH">Youth (Under 25)</option>
                    <option value="ADULT">Adult (25-60)</option>
                    <option value="ELDER">Elder (60+)</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value as Location })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select location</option>
                    <option value="URBAN">Urban</option>
                    <option value="PERI_URBAN">Peri-Urban</option>
                    <option value="RURAL">Rural</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Education Level *</label>
                <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as EducationLevel })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select education level</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                    <option value="TERTIARY">Tertiary</option>
                    <option value="POSTGRADUATE">Postgraduate</option>
                </select>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <Home className="w-12 h-12 mx-auto text-primary mb-2" />
                <h2 className="text-2xl font-semibold">Cultural Background</h2>
                <p className="text-muted-foreground">Share your cultural identity</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Ethnic Background</label>
                <input
                    type="text"
                    value={formData.ethnicBackground}
                    onChange={(e) => setFormData({ ...formData, ethnicBackground: e.target.value })}
                    placeholder="e.g., Zulu, Xhosa, Sotho"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Religious Background</label>
                <input
                    type="text"
                    value={formData.religiousBackground}
                    onChange={(e) => setFormData({ ...formData, religiousBackground: e.target.value })}
                    placeholder="e.g., Christian, Traditional, Muslim"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Language Preference</label>
                <input
                    type="text"
                    value={formData.languagePreference}
                    onChange={(e) => setFormData({ ...formData, languagePreference: e.target.value })}
                    placeholder="e.g., English, Zulu, Xhosa"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <Users className="w-12 h-12 mx-auto text-primary mb-2" />
                <h2 className="text-2xl font-semibold">Family & Social</h2>
                <p className="text-muted-foreground">Tell us about your family structure</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Family Structure *</label>
                <select
                    value={formData.familyStructure}
                    onChange={(e) => setFormData({ ...formData, familyStructure: e.target.value as FamilyStructure })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select family structure</option>
                    <option value="NUCLEAR">Nuclear (Parents & Children)</option>
                    <option value="EXTENDED">Extended (Multiple Generations)</option>
                    <option value="SINGLE_PARENT">Single Parent</option>
                    <option value="GUARDIAN">Guardian/Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Household Size</label>
                <input
                    type="number"
                    min="1"
                    value={formData.householdSize || ""}
                    onChange={(e) => setFormData({ ...formData, householdSize: parseInt(e.target.value) || 0 })}
                    placeholder="Number of people in household"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="hasElders"
                    checked={formData.hasElders}
                    onChange={(e) => setFormData({ ...formData, hasElders: e.target.checked })}
                    className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="hasElders" className="text-sm font-medium">
                    Elders live in the household
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Communication Style</label>
                <input
                    type="text"
                    value={formData.communicationStyle}
                    onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
                    placeholder="e.g., Direct, Indirect, Respectful"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Respect for Authority *</label>
                <select
                    value={formData.respectLevel}
                    onChange={(e) => setFormData({ ...formData, respectLevel: e.target.value as RespectLevel })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select level</option>
                    <option value="HIGH">High</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="RELAXED">Relaxed</option>
                </select>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <DollarSign className="w-12 h-12 mx-auto text-primary mb-2" />
                <h2 className="text-2xl font-semibold">Economic Context</h2>
                <p className="text-muted-foreground">Help us understand your economic situation</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Economic Status *</label>
                <select
                    value={formData.economicStatus}
                    onChange={(e) => setFormData({ ...formData, economicStatus: e.target.value as EconomicStatus })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select economic status</option>
                    <option value="LOW">Low Income</option>
                    <option value="MIDDLE">Middle Income</option>
                    <option value="HIGH">High Income</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Employment Status</label>
                <input
                    type="text"
                    value={formData.employmentStatus}
                    onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                    placeholder="e.g., Employed, Self-employed, Student, Unemployed"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    <Heart className="w-4 h-4 inline mr-2 text-primary" />
                    This information helps us provide culturally sensitive and relevant mental health support tailored to your background.
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card rounded-lg shadow-lg p-6">
                {/* Header with Back Button */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate("/app/settings")}
                        className="p-2 hover:bg-accent rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold ml-4">
                        {existingProfile ? "Update" : "Create"} Cultural Profile
                    </h1>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {currentStep} of {totalSteps}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        {error}
                    </div>
                )}

                {/* Step Content */}
                <div className="mb-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent disabled:opacity-50"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            onClick={handleNext}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : existingProfile ? "Update Profile" : "Complete"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CulturalProfilePage;
