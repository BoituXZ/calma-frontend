export type ResourceType = 'VIDEO' | 'ARTICLE' | 'TOOL' | 'PODCAST' | 'CULTURAL_STORY';

export interface Resource {
    id: string;
    title: string;
    description?: string;
    type: ResourceType;
    link: string;
    tags: string[];
    culturalTags: string[];
    targetAudience: string[];
    createdAt: string;
    updatedAt?: string;
}

export interface SavedResource {
    id: string;
    userId: string;
    resourceId: string;
    recommendationReason?: string;
    culturalRelevance?: string;
    savedAt: string;
    resource?: Resource;
}

export interface SaveResourceRequest {
    resourceId: string;
    recommendationReason?: string;
    culturalRelevance?: string;
}

export interface ResourceFilters {
    type?: ResourceType;
    tags?: string;
    culturalTags?: string;
}
