export type AgeGroup = 'YOUTH' | 'ADULT' | 'ELDER';
export type Location = 'URBAN' | 'RURAL' | 'PERI_URBAN';
export type EducationLevel = 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'POSTGRADUATE';
export type FamilyStructure = 'NUCLEAR' | 'EXTENDED' | 'SINGLE_PARENT' | 'GUARDIAN';
export type RespectLevel = 'HIGH' | 'MODERATE' | 'RELAXED';
export type EconomicStatus = 'LOW' | 'MIDDLE' | 'HIGH';

export interface CulturalProfile {
    id: string;
    userId: string;
    ageGroup: AgeGroup;
    location: Location;
    educationLevel: EducationLevel;
    ethnicBackground?: string;
    religiousBackground?: string;
    languagePreference?: string;
    familyStructure: FamilyStructure;
    householdSize?: number;
    hasElders: boolean;
    communicationStyle?: string;
    respectLevel: RespectLevel;
    economicStatus: EconomicStatus;
    employmentStatus?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateCulturalProfileRequest {
    ageGroup: AgeGroup;
    location: Location;
    educationLevel: EducationLevel;
    ethnicBackground?: string;
    religiousBackground?: string;
    languagePreference?: string;
    familyStructure: FamilyStructure;
    householdSize?: number;
    hasElders: boolean;
    communicationStyle?: string;
    respectLevel: RespectLevel;
    economicStatus: EconomicStatus;
    employmentStatus?: string;
}

export interface UpdateCulturalProfileRequest extends Partial<CreateCulturalProfileRequest> {}
