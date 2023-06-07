import { PoliticalPreferenceEnum } from '../../utils/enums/PoliticalPreferenceEnum';
import { PoliticalPreferenceList } from '../../types/politicalPreferenceTypes';

class UserPoliticalPreference {
    x: number;
    y: number;
    code: PoliticalPreferenceEnum;

    constructor(x: number, y: number, code: PoliticalPreferenceEnum) {
        this.x = x;
        this.y = y;
        this.code = code;
    }
}

export const getPoliticalPreferences = (): PoliticalPreferenceList => {
    const politicalPreferences: UserPoliticalPreference[] = [];

    politicalPreferences.push(
        new UserPoliticalPreference(
            2,
            3,
            PoliticalPreferenceEnum.PRO_EUROPEAN_INTEGRATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            -2,
            -3,
            PoliticalPreferenceEnum.PRO_RUSSIAN_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            2,
            2,
            PoliticalPreferenceEnum.PRO_NATO_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            3,
            2,
            PoliticalPreferenceEnum.PRO_USA_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            -2,
            -2,
            PoliticalPreferenceEnum.PRO_CHINA_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            1,
            -2,
            PoliticalPreferenceEnum.PRO_UCRANIAN_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            -1,
            -3,
            PoliticalPreferenceEnum.PRO_TRANSNISTRIAN_ORIENTATION,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            -5,
            5,
            PoliticalPreferenceEnum.SOCIAL_DEMOCRAT,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(5, 5, PoliticalPreferenceEnum.CONSERVATIVE),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(-5, -5, PoliticalPreferenceEnum.LIBERAL),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(
            -5,
            -3,
            PoliticalPreferenceEnum.LIBERAL_DEMOCRAT,
        ),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(5, -5, PoliticalPreferenceEnum.SOCIALIST),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(7, -7, PoliticalPreferenceEnum.COMMUNIST),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(2, 5, PoliticalPreferenceEnum.AGRARIAN),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(-2, -5, PoliticalPreferenceEnum.GREEN),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(0, 0, PoliticalPreferenceEnum.INDEPENDENT),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(0, 0, PoliticalPreferenceEnum.NON_PARTISAN),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(3, 3, PoliticalPreferenceEnum.REGIONAL),
    );
    politicalPreferences.push(
        new UserPoliticalPreference(-7, -7, PoliticalPreferenceEnum.ANARCHIST),
    );

    return {
        politicalPreferences: politicalPreferences.map(politicalPreference => {
            return {
                x: politicalPreference.x,
                y: politicalPreference.y,
                code: politicalPreference.code,
            };
        }),
    };
};
