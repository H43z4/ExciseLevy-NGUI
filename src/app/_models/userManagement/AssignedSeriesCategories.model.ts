export class AssignedCategories {
    seriesCategoryId: number = 0;
    seriesCategory: string = "";
    isAssigned: boolean = false;
}

export class SaveAssignedCategories {
    UserId: number = 0;
    RoleId: number = 0;
    SeriesCategoryId: number[] = [];
}