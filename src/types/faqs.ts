export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export enum C_brandedOrGeneric {
	BRANDED = "Branded",
	GENERIC = "Generic",
}

export default interface Faq {
	answer?: string,
	landingPageUrl?: string,
	nudgeEnabled?: boolean,
	primaryConversationContact?: any,
	question: string,
	slug?: string,
	logo?: ComplexImage,
	name: string,
	c_answerOption1?: string,
	c_answerOption2?: string,
	c_answerOption3?: string,
	c_brand?: string[],
	c_brandedOrGeneric?: C_brandedOrGeneric,
	c_keyword?: string[],
	c_primaryKeyword?: string[],
	c_secondaryKeyword?: string[],
	keywords?: string[],
	id: string,
	timezone?: any,
}
