c:\nuget\nuget.exe pack .\ExpectThat.Jasmine.nuspec
md c:\nuget\ExpectThat.Jasmine\
copy .\*.nupkg c:\nuget\ExpectThat.Jasmine\ /Y
pause