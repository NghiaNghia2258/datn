import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ChildrenNavbarModel {
    title: string;
    path: string;
}

export interface NavbarItemModel {
    title: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    children?: ChildrenNavbarModel[];
}