/**
@Description      : This file contain form Config Field Data 
**/




export const speedOptions = [

    { value: "", label: "Select Speed" },
    { value: "SPEED_UNKNOWN", label: "Unknown" },
    { value: "SPEED_100M", label: "100 Mbps" },
    { value: "SPEED_1000M", label: "1 Gbps" },
    { value: "SPEED_2500M", label: "2.5 Gbps" },
    { value: "SPEED_5000M", label: "5 Gbps" },
    { value: "SPEED_10G", label: "10 Gbps" },
    { value: "SPEED_20G", label: "20 Gbps" },
    { value: "SPEED_25G", label: "25 Gbps" },
    { value: "SPEED_40G", label: "40 Gbps" },
    { value: "SPEED_50G", label: "50 Gbps" },
    { value: "SPEED_100G", label: "100 Gbps" },
    { value: "SPEED_200G", label: "200 Gbps" },
    { value: "SPEED_400G", label: "400 Gbps" },
    { value: "SPEED_1000G", label: "1000 Gbps" },
    { value: "SPEED_10000G", label: "10000 Gbps" },
];

//{"errval": "The speed must be within 10,100,1000,2500,5000,10000values"}

export const sonicspeedOptions = [

    { value: "", label: "Select Speed" },
    { value: "SPEED_UNKNOWN", label: "Unknown" },
    // { value: "SPEED_100M", label: "100 Mbps" },
    // { value: "SPEED_1000M", label: "1 Gbps" },
    // { value: "SPEED_2500M", label: "2.5 Gbps" },
    // { value: "SPEED_5000M", label: "5 Gbps" },
    { value: "10", label: "10 Gbps" },
    { value: "20", label: "20 Gbps" },
    { value: "25", label: "25 Gbps" },
    { value: "40", label: "40 Gbps" },
    { value: "50", label: "50 Gbps" },
    { value: "100", label: "100 Gbps" },
    { value: "200", label: "200 Gbps" },
    { value: "400", label: "400 Gbps" },
    { value: "1000", label: "1000 Gbps" },
    { value: "10000", label: "10000 Gbps" },
];
export const interfaceTypeOptions = [
    { value: "", label: "Select Interface Type" },
    { value: "SR", label: "SR" },
    { value: "SR2", label: "SR2" },
    { value: "SR4", label: "SR4" },
    { value: "CR", label: "CR" },
    { value: "CR2", label: "CR2" },
    { value: "CR4", label: "CR4" },
    { value: "LR", label: "LR" },
    { value: "LR2", label: "LR2" },
    { value: "LR4", label: "LR4" },
    { value: "KR", label: "KR" },
    { value: "KR2", label: "KR2" },
    { value: "KR4", label: "KR4" },
    { value: "SFI", label: "SFI" },
    { value: "XFI", label: "XFI" },
    { value: "XLAUI", label: "XLAUI" },
];

export const portSpeedOptions = [
    { value: "", label: "Select port-breakout" },
    { value: "2X50G", label: "2x50G" },
    { value: "2X20G", label: "2x20G" },
    { value: "4X25G", label: "4x25G" },
    { value: "4X10G", label: "4x10G" },
];

export const FecMode = [
    { value: "", label: "Select Fec Mode" },
    { value: "fc", label: "FC" },
    { value: "rs", label: "RS" },
    { value: "none", label: "NONE" }
];


export const NeftyLoopBackType = [
    { value: "", label: "Select LoopBackType" },
    { value: "none", label: "none" },
    { value: "shallow", label: "shallow" },
    { value: "deep", label: "deep" }
];

export const ModulationFormat = [
    { value: "", label: "Select Modulation Format" },
    { value: "unknown", label: "unknown" },
    { value: "bpsk", label: "bpsk" },
    { value: "dp-bpsk", label: "dp-bpsk" },
    { value: "qpsk", label: "qpsk" },
    { value: "dp-qpsk", label: "dp-qpsk" },
    { value: "8-qam", label: "8-qam" },
    { value: "dp-8-qam", label: "dp-8-qam" },
    { value: "16-qam", label: "16-qam" },
    { value: "dp-16-qam", label: "dp-16-qam" },
    { value: "32-qam", label: "32-qam" },
    { value: "dp-32-qam", label: "dp-32-qam" },
    { value: "64-qam", label: "64-qam" },
    { value: "dp-64-qam", label: "dp-64-qam" },
];


export const PrbsType = [
    { value: "", label: "Select Prbs-Type" },
    { value: "none", label: "none" },
    { value: "prbs7", label: "prbs7" },
    { value: "prbs9", label: "prbs9" },
    { value: "prbs11", label: "prbs11" },
    { value: "prbs15", label: "prbs15" },
    { value: "prbs20m", label: "prbs20" },
    { value: "prbs23", label: "prbs23" },
    { value: "16-qam", label: "16-qam" },
    { value: "prbs31", label: "prbs31" },
];

export const FecType = [
    { value: "", label: "Select Fec Type" },
    { value: "fc", label: "FC" },
    { value: "rs", label: "RS" },
    { value: "none", label: "NONE" },
    { value: "gfec", label: "GFEC" }
];

export const HostSignalRate = [
    { value: "", label: "Select Signal Rate" },
    { value: "unknown", label: "unknown" },
    { value: "100-gbe", label: "100-gbe" },
    { value: "200-gbe", label: "200-gbe" },
    { value: "400-gbe", label: "400-gbe" },
    { value: "otu4", label: "otu4" }
];





