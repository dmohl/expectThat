(function(a){var b;b={atleastTwoGreaterThan:function(a){return{assertionType:"atleastTwoGreaterThan",expected:a,expr:function(a,b){return a>=b+2}}}};return a.util.extend(pavlov.api,b)})(expectThat);