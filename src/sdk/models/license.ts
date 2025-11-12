export interface LicenseCustomer {
	name?: string;
	email?: string;
}

export interface LicenseProduct {
	name?: string;
}

export interface LicenseEdition {
	name?: string;
}

export interface LicenseQuota {
	activations?: number;
	nodes?: number;
	concurrent_transfers?: number;
	parallel_writes?: number;
	jobs?: number;
	transfer_bytes?: number;
	users?: number;
}

export interface LicenseUsage {
	activations?: number;
	nodes?: number;
	jobs?: number;
	transfer_bytes?: number;
	users?: number;
}

export interface License {
	key?: string;
	activation_id?: string;
	customer?: LicenseCustomer;
	product?: LicenseProduct;
	edition?: LicenseEdition;
	features?: string[];
	trial?: boolean;
	quota?: LicenseQuota;
	used?: LicenseUsage;
	expires_on?: number;
	expired?: boolean;
	failures?: string[];
}
