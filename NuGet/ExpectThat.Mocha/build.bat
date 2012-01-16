c:\nuget\nuget.exe pack .\ExpectThat.Mocha.nuspec
md c:\nuget\ExpectThat.Mocha\
copy .\*.nupkg c:\nuget\ExpectThat.Mocha\ /Y
pause